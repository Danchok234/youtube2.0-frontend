import { Switch } from '@headlessui/react'
import { FC } from 'react'
import { ITogglePublic } from './toggle-public.interface'
import styles from './togglePublic.module.scss'

const TogglePublic: FC<ITogglePublic> = ({ isEnabled, clickHandler }) => {
	return (
		<div className={"flex items-center mt-8 gap-4"}>
			<span className={"text-grey-400"}>Public:</span>
			<Switch
				checked={isEnabled}
				onChange={clickHandler}
				className={`${isEnabled ? 'bg-orange' : 'bg-grey-400'}
          relative inline-flex h-[30px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75  items-center`}
			>
				<span className="sr-only">Is public switcher</span>
        <span
          aria-hidden="true"
          className={`${isEnabled ? 'translate-x-8' : 'translate-x-1'}
            pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out `}
        />
			</Switch>
		</div>
	)
}

export default TogglePublic
