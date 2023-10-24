import Image from 'next/image';

type StatBoxProps = {
	title: string;
	valueComp: any;
	icon?: string ;
};

function StatBox({ title, valueComp, icon }: StatBoxProps) {
	return (
		<div className="flex items-center gap-x-4 bg-abrandc-light-grey dark:bg-agrey-900 rounded-xl p-4 w-full">
			{icon && <Image src={icon} width={28} height={28} alt="" />}

			<div className="flex flex-col gap-y-2">
				<h1 className="text-agrey-600 text-sm font-medium leading-[24px]">{title}</h1>
				<h2 className="text-base font-bold dark:text-white text-abrandc-dark-grey">
					{valueComp()}
				</h2>
			</div>
		</div>
	);
}

export default StatBox;
