import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignUpLayout from "../../ui/SignUpLayout";
import { useData } from "../../store/UserContext";

function LoginStep3Page() {
    const { userData } = useData();
    const [profileImage, setProfileImage] = useState([]);
    const [profileImageURL, setProfileImageURL] = useState([]);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            profilePicture: userData.profilePicture,
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (profileImage.length < 1) return;

        const newImageURL = [];

        try {
            Object.keys(profileImage).forEach((imageIndex) => {
                newImageURL.push(URL.createObjectURL(profileImage[imageIndex]));
            })
        } catch (error) {
            console.log(error);
        }
        setProfileImageURL(newImageURL);
    }, [profileImage]);

    // console.log(userData);

    async function submitHandler(data) {
        const formData = new FormData();
        formData.append("profileImage", profileImage[0]);

        try {
            const response = await fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(userData),
            })
            console.log(response);
            const data = await response.json();
            console.log(data);

            if (data) {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/upload/${data.id}`, {
                        method: "POST",
                        body: formData
                    })

                    const profileData = await response.json();
                    console.log(profileData);
                } catch (error) {
                    console.log(error);
                }
            }

            navigate("../login");
        } catch (error) {
            console.log(error);
        }
    }

    function handleImageChange(event) {
        setProfileImage(event.target.files);
    }

    function handleImageRemove() {
        setProfileImage([]);
        setProfileImageURL([]);
    }

    return (
        <SignUpLayout>
            <form className="flex flex-col justify-center items-center space-x-6 mt-9"
                encType="multipart/form-data"
                onSubmit={handleSubmit(submitHandler)}>
                <p className="mb-6 text-md font-semibold">Choose your profile picture</p>
                <label className="block">
                    <input type="file"
                        className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100
                        "
                        placeholder="al;skdjfa;sd"
                        id="profile-image"
                        multiple={false}
                        {...register("profilePicture")}
                        onChange={handleImageChange}
                    />
                </label>
                {
                    profileImage[0] && (
                        <>
                            <img
                                src={profileImageURL}
                                alt="Profile"
                                className="mt-6 w-48 h-48 rounded-sm mb-3"
                            />
                            <button
                                className="group  w-48 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-ring-red-500"
                                onClick={handleImageRemove}
                            >
                                Remove
                            </button>
                        </>
                    )
                }

                <div className="mt-6 w-full">
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        </span>
                        Sign up
                    </button>
                </div>
            </form>
        </SignUpLayout>
    );
}

export default LoginStep3Page;