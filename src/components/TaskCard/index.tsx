import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import { Task } from '@/types'

import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'


type TaskCardProps = {
  task: Task
}

function TaskCard({ task }: TaskCardProps) {

  const navigate = useNavigate()

  return (
    <li className="bg-white shadow-md rounded-xl p-4 flex justify-between items-start gap-4">
      <div className="flex flex-col gap-2 flex-1">
        <button className="text-lg font-semibold text-purple-600 text-left hover:underline">
          {task.name}
        </button>
        <p className="text-zinc-700 text-sm">{task.description}</p>
      </div>

      <Menu as="div" className="relative">
        <Menu.Button className="p-2 text-gray-500 hover:text-gray-800">
          <span className="sr-only">Opciones</span>
          <EllipsisVerticalIcon className="w-6 h-6" aria-hidden="true" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                  >
                    Ver Tarea
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                  >
                    Editar Tarea
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-red-100 text-red-700' : 'text-red-500'
                      }`}
                  >
                    Eliminar Tarea
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}

export { TaskCard }