import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './interfaces/note.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({ status: 201, description: 'Note created successfully.' })
  async create(@Body() dto: CreateNoteDto): Promise<Note> {
    return this.notesService.createNote(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all notes' })
  @ApiResponse({ status: 200, description: 'All notes retrieved.' })
  async findAll(): Promise<Note[]> {
    return this.notesService.getAllNotes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by ID' })
  @ApiResponse({ status: 200, description: 'Note retrieved.' })
  async findOne(@Param('id') id: string): Promise<Note | null> {
    return this.notesService.getNoteById(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a note by ID' })
  @ApiResponse({ status: 200, description: 'Note updated successfully.' })
  async update(@Param('id') id: string, @Body() dto: UpdateNoteDto): Promise<Note | null> {
    return this.notesService.updateNote(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note by ID' })
  @ApiResponse({ status: 200, description: 'Note deleted successfully.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.notesService.deleteNote(Number(id));
  }
}
