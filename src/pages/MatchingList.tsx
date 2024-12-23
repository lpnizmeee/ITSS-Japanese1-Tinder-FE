import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../components";

type User = {
    userID: number;
    email: string;
    name: string;
    imageURL?: string;
};

type UserInfo = {
    userID: number;
    email: string;
    name: string;
    role: number;
    gender: number;
    dob: string;
    imageURL?: string;
    firstFavourite?: string;
    secondFavourite?: string;
    thirdFavourite?: string;
    fourthFavourite?: string;
    fifthFavourite?: string;
};

export const MatchingList = () => {
    const [matchingUsers, setMatchingUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get<{ user: UserInfo }>(
                    "http://localhost:8888/api/users/profile", // API lấy thông tin từ session
                    { withCredentials: true }
                );
                setUserId(response.data.user.userID);
            } catch (err: any) {
                console.error("Error fetching profile:", err);
            }
        };
        fetchProfile();
    }, []);
    console.log(userId);

    useEffect(() => {
        if (!userId) return;

        const fetchMatchingUsers = async () => {
            try {
                const response = await axios.post("http://localhost:8888/api/users/matching", { userId });
                setMatchingUsers(response.data.matchingUsers);
            } catch (err) {
                console.error("Error fetching matching users:", err);
            }
        };

        fetchMatchingUsers();
    }, [userId]);

    console.log(matchingUsers);
    return (
        <div>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 bg-gradient-to-r from-darkPink to-coralRed">
                <div className="w-full min-h-screen mt-2 mb-2 max-w-md rounded-lg bg-white p-8 shadow-md">
                    <PageTitle title="メッセージ" />
                    <ul className="space-y-4">
                        {matchingUsers.map((user) => (
                            <li
                                key={user.userID}
                                onClick={() => handleChat(user.userID)}
                                className="flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
                            >
                                <img
                                    src={user.imageURL || "/default-avatar.png"}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{user.name}</h3>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};