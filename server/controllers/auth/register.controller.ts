import { BodyController } from "../../utils/types/express.types";
import { CreateUserInput } from "../../utils/types/common.types";
import registerUserService from "../../services/auth/register.service";

const registerUserController: BodyController<CreateUserInput> = async (req, res, next) => {
  try {
    const { name, email, provider } = req.body;
    const token = await registerUserService({ name, email, provider });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: token,
    });
  } catch (err) {
    next(err);
  }
};

export default registerUserController;
