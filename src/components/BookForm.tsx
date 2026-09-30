import { useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'

interface BookFormProps {
    onCreateBook: (
        title: string,
        authors: string,
        pdfFileName: string,
    ) => void
}

function BookForm({ onCreateBook }: BookFormProps) {
    const [title, setTitle] = useState('')
    const [authors, setAuthors] = useState('')
    const [pdfFile, setPdfFile] = useState<File | null>(null)
    const [error, setError] = useState('')

    const fileInputRef = useRef<HTMLInputElement>(null)

    function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault()

        if (title.trim() === '') {
            setError('Title is required.')
            return
        }

        if (pdfFile === null) {
            setError('PDF file is required.')
            return
        }



        onCreateBook(
            title.trim(),
            authors,
            pdfFile.name,
        )

        setTitle('')
        setAuthors('')
        setPdfFile(null)

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value)
                            setError('')
                        }}
                    />
                </label>
            </div>

            <div>
                <label>
                    Authors
                    <input
                        type="text"
                        value={authors}
                        onChange={(event) =>
                            setAuthors(event.target.value)
                        }
                    />
                </label>
            </div>

            <div>
                <label>
                    PDF
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={(event) => {
                            setPdfFile(
                                event.target.files?.[0] ?? null,
                            )
                            setError('')
                        }}
                    />
                </label>

                {pdfFile && (
                    <p>Selected: {pdfFile.name}</p>
                )}
            </div>

            {error && <p>{error}</p>}

            <button type="submit">
                Create Book
            </button>
        </form>
    )
}

export default BookForm