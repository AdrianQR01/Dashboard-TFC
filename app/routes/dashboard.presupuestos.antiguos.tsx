import React from "react";

export default function Antiguos() {
    return (
        <>
            <div className="flex flex-wrap flex-1">
                <div className="flex flex-col md:flex-row gap-4 w-full h-full">
                    <div className="relative w-full ">
                        <div className="text-2xl p-4 font-bold">Resumen del Presupuesto</div>
                        <table className="w-full text-sm text-left ml-2 rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                                <tr>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/>
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">Neil Sims</div>
                                                <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                            </div>
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"/>
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">Bonnie Green</div>
                                                <div className="font-normal text-gray-500">bonnie@flowbite.com</div>
                                            </div>
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Jese image"/>
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">Jese Leos</div>
                                                <div className="font-normal text-gray-500">jese@flowbite.com</div>
                                            </div>
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Jese image"/>
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">Thomas Lean</div>
                                                <div className="font-normal text-gray-500">thomes@flowbite.com</div>
                                            </div>
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Jese image" />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">Leslie Livingston</div>
                                            <div className="font-normal text-gray-500">leslie@flowbite.com</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}