export type ReadingStatus =
    | 'not-started'
    | 'reading'
    | 'completed'

export type ExerciseStatus =
    | 'not-started'
    | 'attempted'
    | 'solved'
    | 'review'

export interface PageLocation {
    printedPage: string
    pdfPage: number
}

export interface Section {
    id: string
    title: string
    startPage: PageLocation
    endPage?: PageLocation
    status: ReadingStatus
    notes: string
    children?: Section[]
}

export interface Chapter {
    id: string
    title: string
    sections: Section[]
}

export interface Exercise {
    id: string
    label: string
    location: PageLocation
    chapterId?: string
    sectionId?: string
    status: ExerciseStatus
    notes: string
}

export interface Book {
    id: string
    title: string
    authors: string[]
    pdfFileName: string
    chapters: Chapter[]
    exercises: Exercise[]
}