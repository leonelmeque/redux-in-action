import { ChangeEvent, FunctionComponent, } from "react";
import { ProjectInterface } from "./types";

interface HeaderProps {
    onSearch: (searchTerm: string) => void;
    onCurrentProjectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    projects: ProjectInterface[];
    toggleForm: () => void;
}

const Header: FunctionComponent<HeaderProps> = ({
    onSearch: _onSearch,
    projects,
    onCurrentProjectChange,
    toggleForm,
}) => {
    // const [state, setState] = useState<{ [key: string]: any }>(initState);

    const projectOptions: JSX.Element[]= projects.map((project) => (
            <option key={project.id} value={project.id}>
               {project.name}
            </option>
        ));

    const onSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        _onSearch(value);
    };
    return (
        <header>
            <div className="flex items-center justify-between my-4">
                <h2 className="text-2xl">"Add a new task"</h2>
                <div>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search task..."
                        className="border-[1px] p-3 bg-white"
                        onChange={onSearch}
                    />
                </div>
                <div>
                    Project :{" "}
                    <select
                        name="project"
                        id="project"
                        className="border py-3 px-4"
                        onChange={onCurrentProjectChange}>
                        {projectOptions}
                    </select>
                </div>
                <button
                    className="py-3 px-4 bg-black rounded-sm text-white font-bold"
                    onClick={toggleForm}>
                    + New Task
                </button>
            </div>
        </header>
    );
};

export default Header;
