import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sql from 'mssql';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './interfaces/note.interface';

@Injectable()
export class NotesService {
  private pool: sql.ConnectionPool;

  constructor(private configService: ConfigService) {
    this.pool = new sql.ConnectionPool({
      user: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASS'),
      server: configService.get<string>('DB_HOST'),
      port: parseInt(configService.get<string>('DB_PORT'), 10),
      database: configService.get<string>('DB_NAME'),
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    });

    this.pool.connect().catch((err) => console.error('DB Connection Failed', err));
  }

  async createNote(dto: CreateNoteDto): Promise<Note> {
    const request = this.pool.request();
    request.input('title', sql.NVarChar, dto.title);
    request.input('content', sql.NVarChar, dto.content);

    const result = await request.execute<sql.IResult<Note>>('CreateNote');
    return result.recordset[0];
  }

  async getAllNotes(): Promise<Note[]> {
    const request = this.pool.request();
    const result = await request.execute<sql.IResult<Note>>('GetAllNotes');
    return result.recordset;
  }

  async getNoteById(id: number): Promise<Note | null> {
    const request = this.pool.request();
    request.input('id', sql.Int, id);

    const result = await request.execute<sql.IResult<Note>>('GetNoteById');
    return result.recordset[0] || null;
  }

  async updateNote(id: number, dto: UpdateNoteDto): Promise<Note | null> {
    const request = this.pool.request();
    request.input('id', sql.Int, id);
    request.input('title', sql.NVarChar, dto.title ?? null);
    request.input('content', sql.NVarChar, dto.content ?? null);

    const result = await request.execute<sql.IResult<Note>>('UpdateNote');
    return result.recordset[0] || null;
  }

  async deleteNote(id: number): Promise<void> {
    const request = this.pool.request();
    request.input('id', sql.Int, id);
    await request.execute('DeleteNote');
  }
}
