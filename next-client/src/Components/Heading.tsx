'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ 
  title, 
  subtitle,
  center
}) => {
  return ( 
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="md:text-2xl xl:text-2xl font-bold text-gray-100">
        {title}
      </div>
      <div className="text-2xl font-light text-gray-300 mt-5">
        {subtitle}
      </div>
    </div>
   );
}
 
export default Heading;