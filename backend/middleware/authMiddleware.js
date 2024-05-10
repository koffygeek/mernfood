import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  const authHeader = request.headers["authorization"];

  if (!authHeader) {
    return response
      .status(401)
      .json({ message: "No tokenn authorization denied" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed", e.message);
    response.status(401).json({ message: "Token is not valid" });
  }
};

export { auth };
