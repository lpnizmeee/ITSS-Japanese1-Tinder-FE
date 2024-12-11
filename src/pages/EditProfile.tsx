import "../assets/Css/profile.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PageTitle, Nav } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EditProfile = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [imageURL, setImageURL] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:8888/api/users/profile", {
                    withCredentials: true,
                });
                const userData = response.data.user;
                setName(userData.name || "");
                setEmail(userData.email || "");
                setGender(userData.gender);
                console.log(gender);
                setSelectedDate(userData.dob ? new Date(userData.dob) : null);
                setImageURL(userData.imageURL || "");
            } catch (err: any) {
                setError(err.response?.data?.message || "Unauthorized");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const updatedUser = {
                name,
                email,
                gender: gender !== null ? parseInt(gender.toString(), 10) : null, // Chuyển `gender` thành số
                dob: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
                imageURL,
            };

            await axios.put("http://localhost:8888/api/users/profile", updatedUser, {
                withCredentials: true,
            });

            navigate("/profile");
        } catch (err: any) {
            setError(err.response?.data?.message || "Error updating profile.");
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div>
            <Nav />
            <div className="flex min-h-screen items-center justify-center bg-gray-100 bg-gradient-to-r from-darkPink to-coralRed">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                    <PageTitle title="プロフィール編集" />
                    <form onSubmit={handleSave}>
                        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                        <div className="profile-header flex flex-col items-center">
                            <img
                                src={imageURL || "default_image.jpg"}
                                alt="Profile"
                                className="w-64 h-auto mb-4 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Paste image URL"
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                                className="w-full p-2 border rounded focus:outline-none"
                            />
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={0}
                                    checked={gender === 0}
                                    onChange={(e) => setGender(parseInt(e.target.value))}
                                />
                                男性
                                <input
                                    type="radio"
                                    name="gender"
                                    value={1}
                                    checked={gender === 1}
                                    onChange={(e) => setGender(parseInt(e.target.value))}
                                />
                                女性
                                <input
                                    type="radio"
                                    name="gender"
                                    value={2}
                                    checked={gender === 2}
                                    onChange={(e) => setGender(parseInt(e.target.value))}
                                />
                                他
                            </div>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
