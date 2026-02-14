export const logoutUser = async (req, res) => {
    try {

        // clr cookie
        res.clearCookie("token", { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict" });

        res.json({ message: "Logout successful" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};