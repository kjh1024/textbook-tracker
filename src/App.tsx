import { useState } from 'react'
import ExerciseItem from './components/ExerciseItem'
import SectionItem from './components/SectionItem'
import { sampleBook } from './data/sampleBook'
import type {
  ExerciseStatus,
  ReadingStatus,
  Section,
} from './types/textbook'

function App() {
  const [book, setBook] = useState(sampleBook)

  function updateSections(
    sections: Section[],
    sectionId: string,
    status: ReadingStatus,
  ): Section[] {
    return sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          status,
        }
      }

      if (section.children) {
        return {
          ...section,
          children: updateSections(
            section.children,
            sectionId,
            status,
          ),
        }
      }

      return section
    })
  }

  function handleSectionStatusChange(
    sectionId: string,
    status: ReadingStatus,
  ) {
    setBook((currentBook) => ({
      ...currentBook,
      chapters: currentBook.chapters.map((chapter) => ({
        ...chapter,
        sections: updateSections(
          chapter.sections,
          sectionId,
          status,
        ),
      })),
    }))
  }
  function handleExerciseStatusChange(
    exerciseId: string,
    status: ExerciseStatus,
  ) {
    setBook((currentBook) => ({
      ...currentBook,
      exercises: currentBook.exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
            ...exercise,
            status,
          }
          : exercise,
      ),
    }))
  }
  function countSections(sections: Section[]): {
    total: number
    completed: number
  } {
    return sections.reduce(
      (count, section) => {
        count.total += 1

        if (section.status === 'completed') {
          count.completed += 1
        }

        if (section.children) {
          const childCount = countSections(section.children)
          count.total += childCount.total
          count.completed += childCount.completed
        }

        return count
      },
      { total: 0, completed: 0 },
    )
  }
  const readingProgress = book.chapters.reduce(
    (count, chapter) => {
      const sectionCount = countSections(chapter.sections)

      return {
        total: count.total + sectionCount.total,
        completed: count.completed + sectionCount.completed,
      }
    },
    { total: 0, completed: 0 },
  )

  const exerciseProgress = {
    total: book.exercises.length,
    solved: book.exercises.filter(
      (exercise) => exercise.status === 'solved',
    ).length,
  }

  return (
    <main>
      <h1>{book.title}</h1>
      <p>{book.authors.join(', ')}</p>
      <p>
        Reading Progress: {readingProgress.completed} / {readingProgress.total}
      </p>
      <p>
        Exercise progress: {exerciseProgress.solved} / {exerciseProgress.total}
      </p>

      {book.chapters.map((chapter) => (
        <section key={chapter.id}>
          <h2>{chapter.title}</h2>

          {chapter.sections.map((section) => (
            <SectionItem
              key={section.id}
              section={section}
              onStatusChange={handleSectionStatusChange}
            />
          ))}
        </section>
      ))}

      <h2>Exercises</h2>

      {book.exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          onStatusChange={handleExerciseStatusChange}
        />
      ))}
    </main>
  )
}

export default App