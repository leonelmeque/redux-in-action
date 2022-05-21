import { CreateTasksActions, TaskActions } from "../../../../redux/actions/tasks-actions"
import { asyncCreateTask, createTaskSucceeded } from "../../../../redux/creators/tasks-creators-server"
import { TaskInterface } from "../../../../components/types"
import * as api from '../../../../lib/api'
import { mockStore } from "../../../../mocks/redux-store"
jest.unmock('../../../../lib/api')


const mockCreateTask = jest.fn() as jest.Mock<typeof api.createTask>

mockCreateTask.mockReturnValue(() => new Promise((resolve, reject) => resolve({ data: 'off', headers: {}, status: 200, config: {}, statusText: 'Ok' })))


const task: TaskInterface = {
    id: 1,
    title: 'Get schwifty',
    description: 'show me what you got',
    projectId: "1",
    status: 'Complete',
    timer: 0
}

describe('[action creators]: tasks', () => {
    it("should handle successful task creation", () => {
       

        const expectedAction: CreateTasksActions = {
            type: TaskActions.CREATE_TASK_SUCCEEDED, payload: {
                task
            }, meta: {
                analytics: {
                    data: {
                        id: 1
                    },
                    event: TaskActions.CREATE_TASK_SUCCEEDED
                }
            }
        }
        expect(createTaskSucceeded(task)).toEqual(expectedAction)
    })
})

describe("createTask", ()=>{
    it("works", ()=>{
        const expectedActions = [
            {type: TaskActions.CREATE_TASK_STARTED},
            {type: TaskActions.CREATE_TASK_SUCCEEDED, payload:{task: task}}
        ]

        const store = mockStore({
            task:{
                tasks:[]
            }
        })

        return store.dispatch(asyncCreateTask({})).then(()=>{
            expect(store.getActions()).toEqual(expectedActions)
            expect(api.createTask).toHaveBeenCalled()
        })
    })
})