import type { Book } from '../types/textbook'

export const sampleBook: Book = {
    id: 'sample-book',
    title: 'Sample Mathematics Textbook',
    authors: ['John Doe'],
    pdfFileName: 'sample.pdf',

    chapters: [
        {
            id: 'chapter-1',
            title: 'Introduction',
            sections: [
                {
                    id: 'section-1-1',
                    title: 'Basic Concepts',
                    startPage: {
                        printedPage: '1',
                        pdfPage: 15,
                    },
                    endPage: {
                        printedPage: '8',
                        pdfPage: 22,
                    },
                    status: 'reading',
                    notes: '',

                    children: [
                        {
                            id: 'section-1-1-1',
                            title: 'Definitions',
                            startPage: {
                                printedPage: '2',
                                pdfPage: 16,
                            },
                            endPage: {
                                printedPage: '4',
                                pdfPage: 18,
                            },
                            status: 'completed',
                            notes: '',
                        },
                    ],
                },
            ],
        },
    ],

    exercises: [
        {
            id: 'exercise-1',
            label: 'Exercise 1.1',
            location: {
                printedPage: '4',
                pdfPage: 18,
            },
            chapterId: 'chapter-1',
            sectionId: 'section-1-1',
            status: 'not-started',
            notes: '',
        },
    ],
}