'use client';

interface ModalHeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const ModalHeading : React.FC<ModalHeadingProps> = ({
    title,
    subtitle,
    center
}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
        <div className="md:text-2xl xl:text-2xl font-bold text-gray-100">{title}</div>
        <div className="font-light text-gray-300">{subtitle}</div>
    </div>
  )
}
export default ModalHeading