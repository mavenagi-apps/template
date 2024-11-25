import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const GET = async () => {
  try {
    const filePath = path.join(process.cwd(), 'data', 'amendments.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading the JSON file:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
};
