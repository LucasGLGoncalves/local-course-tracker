import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

let rootDir = '';
let toolConfigPath = '';
let currentUser = '';
let users = [];

const ensureToolConfig = async () => {
  try {
    await fs.mkdir(toolConfigPath, { recursive: true });
    const usersPath = path.join(toolConfigPath, 'users.json');

    try {
      const content = JSON.parse(await fs.readFile(usersPath, 'utf8'));
      users = content.usuarios;
      currentUser = content.atual;
    } catch {
      users = ['Lucas', 'Ane'];
      currentUser = 'Lucas';
      await fs.writeFile(usersPath, JSON.stringify({ usuarios: users, atual: currentUser }, null, 2));
    }
  } catch (err) {
    console.error('Erro criando tool-config:', err);
  }
};

const getProgressFilePath = () => path.join(toolConfigPath, `progresso-${currentUser}.json`);

const loadProgress = async () => {
  const file = getProgressFilePath();
  try {
    const content = await fs.readFile(file, 'utf8');
    return JSON.parse(content);
  } catch {
    return { modulos: {} };
  }
};

const saveProgress = async (data) => {
  const file = getProgressFilePath();
  await fs.writeFile(file, JSON.stringify(data, null, 2));
};

app.post('/set-root', async (req, res) => {
  rootDir = req.body.root;
  toolConfigPath = path.join(rootDir, 'tool-config');
  await ensureToolConfig();
  res.send({ ok: true });
});

app.get('/modules', async (req, res) => {
  try {
    const items = await fs.readdir(rootDir, { withFileTypes: true });
    const modulos = items.filter(d => d.isDirectory() && d.name !== 'tool-config').map(d => d.name);
    const progress = await loadProgress();

    const data = await Promise.all(modulos.map(async modulo => {
      const capDir = path.join(rootDir, modulo);
      const caps = await fs.readdir(capDir, { withFileTypes: true });
      const capitulos = caps.filter(d => d.isDirectory()).map(d => d.name);
      let total = 0;
      let concluidos = 0;

      capitulos.forEach(cap => {
        const aulas = progress?.modulos?.[modulo]?.[cap];
        if (aulas) {
          total += Object.keys(aulas).length;
          concluidos += Object.values(aulas).filter(v => v).length;
        }
      });

      return {
        nome: modulo,
        progresso: total ? Math.round((concluidos / total) * 100) : 0
      };
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar módulos', details: err.message });
  }
});

app.get('/modules/:module/chapters', async (req, res) => {
  const moduleName = req.params.module;
  const modulePath = path.join(rootDir, moduleName);

  try {
    const capDirs = await fs.readdir(modulePath, { withFileTypes: true });
    const caps = capDirs.filter(d => d.isDirectory()).map(d => d.name);

    const progress = await loadProgress();
    const modData = progress.modulos?.[moduleName] || {};

    const result = await Promise.all(caps.map(async cap => {
      const chapterPath = path.join(modulePath, cap);
      const videoFiles = await fs.readdir(chapterPath);

      const aulaData = videoFiles
        .filter(v => v.endsWith('.mp4')) // só vídeos
        .map(nome => ({
          nome,
          concluida: modData?.[cap]?.[nome] || false
        }));

      const total = aulaData.length;
      const concluidas = aulaData.filter(a => a.concluida).length;

      return {
        nome: cap,
        aulas: aulaData,
        progresso: total ? Math.round((concluidas / total) * 100) : 0
      };
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar capítulos', details: err.message });
  }
});

app.post('/set-user', async (req, res) => {
  const { nome } = req.body;
  if (!users.includes(nome)) {
    return res.status(400).json({ error: 'Usuário não encontrado' });
  }

  currentUser = nome;
  await fs.writeFile(path.join(toolConfigPath, 'users.json'), JSON.stringify({ usuarios: users, atual: currentUser }, null, 2));
  res.send({ ok: true });
});

// mais rotas em breve: /modules/:id/chapters, /mark-as-complete etc.

app.listen(4000, () => console.log('🚀 Backend rodando na porta 4000'));
