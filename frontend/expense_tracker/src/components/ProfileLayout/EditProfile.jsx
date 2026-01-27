import React, { useRef, useState, useCallback } from 'react'
import { FiUser, FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import EditProfileForm from './EditProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Cropper from "react-easy-crop"
import axios from 'axios';
import { ProfileUpdate } from '../../Store/profileSlice';
import { fetchUser } from '../../Store/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import getCroppedImg from './getCroppedImg'; // helper function

const EditProfile = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { ref: registerRef } = register("avatar");
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.profile)
    const res = useSelector((state) => state?.auth?.user)

    // image states
    const [PreviewImg, setPreviewImg] = useState(res?.user?.avatar || null)
    const [updateProfileImg, setupdateProfileImg] = useState(null)
    const fileInputRef = useRef()
    const [isDragging, setisDragging] = useState(false)

    // crop states
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleImageUpload = (file) => {
        if (file && file.type.startsWith("image/")) {
            if (file.size <= 5242880) { // 5MB
                setupdateProfileImg(file)
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreviewImg(e.target.result);
                }
                reader.readAsDataURL(file)
            } else {
                toast.error('The image size must not exceed 5MB');
            }
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setisDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        setisDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setisDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleImageUpload(file);
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) handleImageUpload(file);
    };

    const handleRemovePrev = () => {
        setPreviewImg(null)
        setupdateProfileImg(null)
    }

    const onUpdate = async (data) => {
        let imageUrl = null;

        try {
            console.log(updateProfileImg

            );
            
            if (PreviewImg && croppedAreaPixels) {
                // Crop the image first
                const croppedBlob = await getCroppedImg(PreviewImg, croppedAreaPixels)
                const previewUrl = URL.createObjectURL(croppedBlob);
                setPreviewImg(previewUrl);
                
                const formData = new FormData();
                formData.append("image", croppedBlob);
                
                const imageUploadResponse = await axios.post(
                    "/api/v1/auth/upload-image",
                    formData
                );
                imageUrl = imageUploadResponse.data.imageUrl;
            }

            const updatedData = {
                avatar: imageUrl,
                ...data
            };

            const result = await dispatch(ProfileUpdate(updatedData))
            if (ProfileUpdate.fulfilled.match(result)) {
                dispatch(fetchUser())
                toast.success("Profile updated successfully!")
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to update profile")
        }
    }

    const onCropComplete = useCallback((croppedArea, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    return (
        <div className="min-w-[70vw] md:max-w-4xl py-6 md:px-4 md:py-12 w-full lg:w-[90%] lg:max-w-7xl">
            <div className="rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
                    <h1 className="text-[max(1.8rem,7.2vw)] lg:text-[clamp(2.3125rem,1.6568rem+1.0246vw,2.9375rem)] font-bold text-white">Edit Profile</h1>
                    <p className="text-blue-100 lg:text-[font-size: clamp(0.9375rem,0.2818rem+1.0246vw,1.5625rem)]">Update your personal information and preferences</p>
                </div>

                <form onSubmit={handleSubmit(onUpdate)} className="p-8" encType="multipart/form-data">
                    {/* Profile Image Section */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="relative flex flex-col items-center">
                                <label htmlFor='avatar' className="block text-sm font-semibold text-gray-700 mb-4">Profile Picture</label>
                                <div id='avatar' className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white shadow-lg">
                                    {PreviewImg ? (
                                        <img src={PreviewImg} alt="Profile preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <FiUser className="w-12 h-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                {PreviewImg && (
                                    <button type="button" onClick={handleRemovePrev} className="absolute -bottom-3 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg">
                                        <MdDelete className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <div className="flex-1">
                                <div
                                    className={`border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${isDragging
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <div className="text-center">
                                        <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600 mb-2">
                                            Drag and drop your image here, or{' '}
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-blue-600 hover:text-blue-700 font-medium">
                                                browse
                                            </button>
                                        </p>
                                        <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
                                    </div>
                                    <input
                                        ref={(e) => {
                                            registerRef(e);
                                            fileInputRef.current = e;
                                        }}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                        name='avatar'
                                    />
                                </div>

                                {/* Cropper */}
                                {PreviewImg && (
                                    <div className="relative w-full h-80 mt-4 bg-gray-100">
                                        <Cropper
                                            image={PreviewImg}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={1}
                                            onCropChange={setCrop}
                                            onZoomChange={setZoom}
                                            onCropComplete={onCropComplete}
                                        />
                                        <input
                                            type="range"
                                            min={1}
                                            max={3}
                                            step={0.01}
                                            value={zoom}
                                            onChange={(e) => setZoom(e.target.value)}
                                            className="w-full mt-2 hidden"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <EditProfileForm loading={loading} register={register} reset={reset} handleSubmit={handleSubmit} res={res} />
                </form>
            </div>

            <Toaster toastOptions={{
                error: {
                    style: { backgroundImage: "linear-gradient(to right,#155dfc,#9810fa)", color: "white" }
                },
                success: {
                    style: { backgroundImage: "linear-gradient(to right,#00b09b,#96c93d)", color: "white" }
                }
            }} />
        </div>
    )
}

export default EditProfile;
