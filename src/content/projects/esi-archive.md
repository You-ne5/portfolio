## The problem

ESI's registrar's office kept decades of student records on paper only.

- Any lookup in the archive cost the staff hours of manual searching.
- No digital trace of the records existed.
- Names were spelled inconsistently across documents.
- Many student IDs were missing.
- Scan quality was low.

## What we built

A full digitization process and archive management system for the 1977–1984 records, built by a team of 6 as our 2nd-year pluridisciplinary project.

**1. Digitization pipeline (Python)**

- Extracts data from scanned deliberation reports using image processing and LLM-assisted extraction.
- Verification scripts flag name inconsistencies and extraction errors.

**2. Database (SQLite)**

- Stores students, modules and results in a clean relational structure.

**3. Desktop app (Flutter)**

- Search students across the whole archive.
- Generate transcripts and certificates.
- View rankings and pull statistics.
- Runs fully offline, so the data stays on the office's machine.

## Results

- 72 documents digitized.
- ~2,177 student transcripts, searchable in seconds instead of hours.
- 100+ modules recorded.

# screenshots

![StudentsDetails](screen_1.png)

<!--
Add screenshots by placing images in public/projects/esi-archive/ and referencing them by file name:

![Dashboard](esi-archive.png)
-->
