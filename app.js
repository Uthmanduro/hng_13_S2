import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to analyze and store a string
app.post('/strings', async (req, res) => {
  const { value } = req.body || {};
  if (value === undefined)
    return res.status(400).json({ error: 'Missing "value" field' });
  if (typeof value !== 'string')
    return res
      .status(422)
      .json({ status: 'error', message: 'Field "value" must be a string' });

  const sha256 = crypto.createHash('sha256').update(value).digest('hex');

  // check for duplicate
  await prisma.$connect();
  if (await prisma.analyzedString.findUnique({ where: { id: sha256 } })) {
    return res
      .status(409)
      .json({ status: 'error', message: 'String already exists' });
  }

  // analyze string
  const properties = {
    length: value.length,
    is_palindrome:
      value.toLowerCase() === value.split('').reverse().join('').toLowerCase(),
    unique_characters: new Set(value).size,
    word_count: (value.match(/\b\w+\b/g) || []).length,
    sha256_hash: sha256,
    character_frequency_map: (() => {
      const freqMap = {};
      for (const char of value) {
        freqMap[char] = (freqMap[char] || 0) + 1;
      }
      return freqMap;
    })(),
  };

  // store in database
  await prisma.analyzedString.create({
    data: {
      id: sha256,
      value,
      ...properties,
    },
  });

  return res.status(201).json({
    id: sha256,
    value,
    properties,
    created_at: new Date().toISOString(),
  });
});

// Endpoint to get all strings with filtering
app.get('/strings', async (req, res) => {
  const {
    is_palindrome,
    min_length,
    max_length,
    word_count,
    contains_character,
  } = req.query;

  // handle invalid query params
  if (
    !['true', 'false', undefined].includes(is_palindrome) ||
    ![min_length, max_length, word_count].every(
      (param) => param === undefined || !isNaN(parseInt(param, 10))
    ) ||
    ![contains_character, undefined].every(
      (param) => param === undefined || param.length === 1
    )
  ) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid query parameters' });
  }

  await prisma.$connect();

  const filters = {};
  if (is_palindrome !== undefined) {
    filters['is_palindrome'] = is_palindrome === 'true';
  }
  if (min_length !== undefined) {
    filters['length'] = { gte: parseInt(min_length, 10) };
  }
  if (max_length !== undefined) {
    filters['length'] = { lte: parseInt(max_length, 10) };
  }
  if (word_count !== undefined) {
    filters['word_count'] = { equals: parseInt(word_count, 10) };
  }
  if (contains_character) {
    filters['value'] = { contains: contains_character };
  }

  const records = await prisma.analyzedString.findMany({
    where: filters,
  });

  const response = {
    data: records,
    count: records.length,
    filters_applied: filters,
  };

  return res.status(200).json(response);
});

// Endpoint for natural language processing
app.get('/strings/filter-by-natural-language', async (req, res) => {
  const query_banks = {
    'all single word palindromic strings': {
      is_palindrome: true,
      word_count: 1,
    },
    'strings longer than 10 characters': {
      length: { gte: 10 },
    },
    'palindromic strings that contain the first vowel': {
      is_palindrome: true,
      value: { contains: 'a' },
    },
    'strings containing the letter z': {
      value: { contains: 'z' },
    },
  };

  try {
    if (!req.query.query) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Missing query parameter' });
    }

    const normalized = req.query.query.toLowerCase();
    const query = query_banks[normalized];

    if (!query) {
      return res
        .status(400)
        .json({ error: 'Unable to parse natural language query' });
    }

    const records = await prisma.analyzedString.findMany({ where: query });
    res.json({ data: records, count: records.length });
  } catch (err) {
    res.status(422).json({
      status: 'error',
      message: 'Query parsed but resulted in conflicting or invalid filters',
      details: err.message,
    });
  }
});

// Endpoint to get a particular string analysis by its SHA-256 hash
app.get('/strings/:string_value', async (req, res) => {
  const { string_value } = req.params;

  await prisma.$connect();

  const sha256 = crypto.createHash('sha256').update(string_value).digest('hex');

  const record = await prisma.analyzedString.findUnique({
    where: { id: sha256 },
  });

  if (!record) {
    return res
      .status(404)
      .json({ status: 'error', message: 'String analysis not found' });
  }

  const response = {
    id: record.id,
    value: record.value,
    created_at: record.created_at,
    properties: {
      length: record.length,
      is_palindrome: record.is_palindrome,
      unique_characters: record.unique_characters,
      word_count: record.word_count,
      sha256_hash: record.id,
      character_frequency_map: record.character_frequency_map,
    },
  };

  return res.status(200).json(response);
});

// Endpoint to delete a given string if it exists
app.delete('/strings/:string_value', async (req, res) => {
  const { string_value } = req.params;

  await prisma.$connect();

  const sha256 = crypto.createHash('sha256').update(string_value).digest('hex');

  const record = await prisma.analyzedString.findUnique({
    where: { id: sha256 },
  });

  if (!record) {
    return res.status(404).json({
      status: 'error',
      message: 'String does not exist in the system.',
    });
  }

  await prisma.analyzedString.delete({
    where: { id: record.id },
  });

  return res.status(204).send();
});

app.listen(8000, () => console.log('App listening on port 8000'));
