import { ActionFunctionArgs, LoaderFunctionArgs, UploadHandler, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { authenticator } from '~/services/auth.server';
import db from '~/services/db';
import { uploadImage } from '~/services/utils.server';
import {
    unstable_composeUploadHandlers as composeUploadHandlers,
    unstable_createMemoryUploadHandler as createMemoryUploadHandler,
    unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const userId = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
    const user = await db.usuario.findUnique({
        where: { id: userId.id },
    });
    return json({ user });
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const uploadHandler: UploadHandler = composeUploadHandlers(
        async ({ name, data }) => {
            if (name !== "img") {
                return undefined;
            }
            const uploadedImage: any = await uploadImage(data);
            return uploadedImage.secure_url;
        },
        createMemoryUploadHandler(),
    );

    const formData = await parseMultipartFormData(request, uploadHandler);
    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    const email = formData.get('email') as string;
    const imgSrc = formData.get("img");

    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    const updateData: any = {
        email: email,
        name: name,
        surname: surname,
    };

    if (imgSrc && typeof imgSrc === 'string') {
        updateData.profilePicture = imgSrc;
    }

    const userUpdate = await db.usuario.update({
        where: { id: Number(user.id) },
        data: updateData,
    });

    console.log(userUpdate)
    return { result: true }
};

const ProfileCard = () => {
    const fetchedData = useLoaderData<typeof loader>();

    const [userData, setUserData] = useState({
        name: fetchedData.user?.name,
        email: fetchedData.user?.email,
        surname: fetchedData.user?.surname,
        profilePic: fetchedData.user?.profilePicture, // Imagen de perfil por defecto
    });

    const [name, setName] = useState(userData.name);
    const [surname, setSurname] = useState(userData.surname);
    const [email, setEmail] = useState(userData.email);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto my-20 flex flex-col items-center justify-center">
            <div className="flex items-center mb-4">
                <img
                    className="w-16 h-16 rounded-full border-2 border-gray-300"
                    src={userData.profilePic as string}
                    alt={name}
                />
                <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                    <p className="text-gray-600">{email}</p>
                </div>
            </div>
            <form className="space-y-4" encType="multipart/form-data" method='post'>
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Surname
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="surname"
                        type="text"
                        name='surname'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="profilePic">
                        Profile Picture
                    </label>
                    <input
                        id="img-field"
                        type="file"
                        name="img"
                        accept="image/*"
                        placeholder='Imagen de perfil'
                        className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                    />
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                        type="submit"
                    >
                        Save Changes
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
                        type="button"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileCard;
