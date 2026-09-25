
import type { ReadingStatus, 
            Section } from '../types/textbook'


interface SectionItemProps {
    section: Section
    onStatusChange: (
        sectionId: string,
        status: ReadingStatus
    ) => void
}

function SectionItem({ section,
    onStatusChange,
 }: SectionItemProps) {
    //const [status, setStatus] = useState(section.status)
    return (
        <div>
            <h3>{section.title}</h3>

            <p>
                Pages {section.startPage.printedPage}
                {section.endPage &&
                    `–${section.endPage.printedPage}`}
            </p>

            <p>Status: {section.status}</p>
            <select
                value={section.status}
                onChange={(event) => onStatusChange(section.id, 
                    event.target.value as ReadingStatus)}
            >
                <option value="not-started">Not Started</option>
                <option value="reading">Reading</option>
                <option value="completed">Completed</option>
            </select>
            {section.children?.map((child) => (
                <SectionItem
                    key={child.id}
                    section={child}
                    onStatusChange={onStatusChange}
                />
            ))}
        </div>
    )
}

export default SectionItem