import type {
    Exercise,
    ExerciseStatus,
} from '../types/textbook'

interface ExerciseItemProps {
    exercise: Exercise
    onStatusChange: (
        exerciseId: string,
        status: ExerciseStatus,
    ) => void
}

function ExerciseItem({
    exercise,
    onStatusChange,
}: ExerciseItemProps) {
    return (
        <div>
            <h3>{exercise.label}</h3>
            <p>Page {exercise.location.printedPage}</p>
            <p>Status: {exercise.status}</p>

            <select
                value={exercise.status}
                onChange={(event) =>
                    onStatusChange(
                        exercise.id,
                        event.target.value as ExerciseStatus,
                    )
                }
            >
                <option value="not-started">Not Started</option>
                <option value="attempted">Attempted</option>
                <option value="solved">Solved</option>
                <option value="review">Review</option>
            </select>
        </div>
    )
}

export default ExerciseItem