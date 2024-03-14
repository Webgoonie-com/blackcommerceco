import Image from 'next/image';
import React, { useCallback, useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { TbPhotoPlus } from 'react-icons/tb';



interface ImageUploadPropertyProps {
    onChange: (value: string[], userId: string, currentUser: string) => void;
    userId: string;
    currentUser: string;
    value: string;
}

const ImageUploadProperty: React.FC<ImageUploadPropertyProps> = ({
    onChange,
    userId,
    currentUser
}) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const imageRef = useRef<HTMLInputElement>(null);

    const handleUpload = useCallback(() => {
        onChange(selectedImages, userId, currentUser);
    }, [onChange, selectedImages, userId, currentUser]);

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const urls = files.map(file => URL.createObjectURL(file));
            setSelectedImages(prevImages => [...prevImages, ...urls]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    return (
        <>
            <div>
                <h2>Upload Images Of This Property</h2>

                <div className="relative cursor-pointer">
                    {!selectedImages || selectedImages.length === 0 && (
                        <div
                            onClick={() => imageRef.current?.click()}
                            className="cursor-pointer relative hover:opacity-70 transition border-dashed border-2 border-indigo-300 flex flex-col justify-center items-center text-white"
                        >
                            <div
                                className="
                                    text-center
                                    relative
                                    cursor-pointer
                                    hover:opacity-70
                                    transition
                                    p-20
                                    border-indigo-300
                                    flex
                                    flex-col
                                    items-center
                                    text-white
                                "
                            >
                                <TbPhotoPlus size={72} />
                                <div className="self-auto text-center font-semibold text-lg">
                                    Click To Upload
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <div className="relative hover:opacity-70 transition border-dashed border-2 border-indigo-300 flex flex-row justify-start items-start text-white">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="relative self-start p-2 ml-3">
                                <IoMdClose
                                    size={18}
                                    className="relative cursor-pointer"
                                    onClick={() => removeImage(index)}
                                />
                                <Image
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    width={600}
                                    height={600}
                                    className="relative"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <input type="file" multiple name="myImage" ref={imageRef} onChange={onImageChange} style={{ display: 'none' }} />
            </div>
        </>
    );
};

export default ImageUploadProperty;

