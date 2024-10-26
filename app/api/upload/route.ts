// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure your Prisma client is set up
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // **Validate File Types**
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type.' }, { status: 400 });
    }

    // **Convert File to Buffer**
    const buffer = Buffer.from(await file.arrayBuffer());

    // **Limit File Size**
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (buffer.length > maxSize) {
      return NextResponse.json({ error: 'File is too large.' }, { status: 400 });
    }

    // **Generate a Unique Filename**
    const uniqueFilename = `${uuidv4()}-${file.name}`;

    // **Define the File Path**
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    const filePathOnDisk = join(uploadsDir, uniqueFilename);
    const filepath = `/uploads/${uniqueFilename}`;

    // **Ensure the Uploads Directory Exists**
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    // **Save the File to Disk**
    const stream = createWriteStream(filePathOnDisk);
    stream.write(buffer);
    stream.end();

    // **Save File Metadata to the Database**
    await prisma.file.create({
      data: {
        filename: uniqueFilename,
        filepath,
        size: buffer.length,
        // Add additional fields as needed, e.g., userId
      },
    });

    return NextResponse.json({ message: 'File uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading file:', error);
    if (error instanceof PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
