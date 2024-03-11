import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {createTask, deleteTask, updateTask, getTask} from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'

export function TaskFormPage() {

    const { 
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm();
    const navigate = useNavigate()
    const params = useParams()
    console.log(params)

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateTask(params.id, data);
            toast.success('La tarea se ha editado exitosamente.', {
                position: "top-center",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        } else {
            await createTask(data);
            toast.success('La tarea se ha creado exitosamente.', {
                position: "top-center",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }

        navigate('/tasks');
    });

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                console.log('Obteniendo datos.');
                const {
                    data: { title, description }
                } = await getTask(params.id);
                setValue('title', title)
                setValue('description', description)
            }
        }
        loadTask()
    }, [])

    return (
        <div className='max-w-xl mx-auto'>

            <form onSubmit={onSubmit}>
                <input type="text" placeholder="title"
                {...register("title", { required: true })}
                className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />
                {errors.title && <span>Title is REQUIRED.</span>}

                <textarea rows="3" placeholder="Description"
                {...register("description", { required: true })}
                className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                ></textarea>
                {errors.description && <span>Description is REQUIRED.</span>}
                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
                    Save
                </button>
            </form>

            {params.id && 

            <div className='flex justify-end'>

                <button 
                className='bg-red-500 p-3 rounded-lg w-48 mt-3'
                onClick={async () => {
                const accepted = window.confirm('Are you sure?')
                if (accepted) {
                    await deleteTask(params.id);
                    toast.success('La tarea se ha eliminado exitosamente.', {
                        position: "top-center",
                        style: {
                            background: "#101010",
                            color: "#fff"
                        }
                    })
                    navigate('/tasks');
                }
                }}>Delete
                </button>

            </div>
            
            }

        </div>
    )
}