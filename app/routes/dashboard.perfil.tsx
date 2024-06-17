import { ActionFunctionArgs } from '@remix-run/node';
import { useState } from 'react';
import { authenticator } from '~/services/auth.server';


export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData();
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
    // const presupuesto = await db.presupuesto.create({
    //   data: {
    //     id: Number(form.get("id")),
    //     total: Number(form.get("total")),
    //     nombrePresupuesto: String(form.get("nombrePresupuesto")),
    //     estado: String(form.get("estado")),
    //     fechaInicio: String(form.get("fechaInicio")),
    //     fechaFin: String(form.get("fechaFin")),
    //     eventoId: Number(form.get("eventoId")),
    //     usuarioId: user.id
    //   },
    // })
    // return { presupuesto }
    return {result:true}
  }


const ProfileCard = () => {
  const [name, setName] = useState('Isabella Rodriguez');
  const [email, setEmail] = useState('isabella@example.com');
  const [password, setPassword] = useState('********'); // Placeholder for initial password display
  const [profilePic, setProfilePic] = useState('https://i.imgur.com/r5Z0p0O.jpg');



  

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setProfilePic(reader.result.toString());
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
      <div className="flex items-center mb-4">
        <img
          className="w-16 h-16 rounded-full border-2 border-gray-300"
          src={profilePic}
          alt={name}
        />
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        {/* Aquí podrías agregar cualquier otra información adicional si fuera necesaria */}
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="profilePic">
            Profile Picture
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
