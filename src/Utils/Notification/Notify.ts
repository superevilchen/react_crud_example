import { Notyf } from "notyf";

// edit here - success status
export enum SccMsg {
  ADDED_AUTHOR = "Added author successfully",
  UPDATED_AUTHOR = "Updated author successfully",
  DELETED_AUTHOR = "Deleted author successfully",
  GOT_AUTHOR = "got authors successfully",

  ADDED_BOOK = "Added book successfully",
  UPDATED_BOOK = "Updated book successfully",
  DELETED_BOOK = "Deleted book successfully",
  GOT_BOOK = "got books successfully",

  LOGIN_SUCCESS = "Login Success successfully",
  LOGOUT_SUCCESS = "Logout Successfully",
  REGISTER_SUCCESS = "Registered Successfully"
}

// edit here - fail status
export enum ErrMsg {
  FAIL_ADDED_AUTHOR = "Failed to add author",
  FAIL_UPDATED_AUTHOR = "Failed to update author",
  FAIL_DELETED_AUTHOR = "Failed to delete author",
  FAIL_GOT_AUTHOR = "Failed to get authors",

  FAIL_ADDED_BOOK = "Failed to add book",
  FAIL_UPDATED_BOOK = "Failed to update book",
  FAIL_DELETED_BOOK = "Failed to delete book",
  FAIL_GOT_BOOK = "Failed to get books",

  FAIL_LOGIN = "Failed to login",
  FAIL_LOGOUT = "Failed to log out",
  FAIL_REGISTER = "Failed to register",
}
class Notify {
  private notification = new Notyf({
    duration: 4000,
    position: { x: "left", y: "bottom" },
  });
  public success(message: string) {
    this.notification.success(message);
  }

  public error(err: any) {
    const msg = this.extractMsg(err);
    this.notification.error(msg);
  }

  private extractMsg(err: any): string {
    if (typeof err === "string") {
      return err;
    }

    if (typeof err?.response?.data === "string") {
      //Backend exact error
      return err.response.data;
    }

    if (Array.isArray(err?.response?.data)) {
      // Backend exact error list
      return err?.response?.data[0];
    }

    // Must be last
    if (typeof err?.message === "string") {
      return err.message;
    }

    // this will return if there is an error that's no handled here
    return "an error occurred, please try again.";
  }
}
const notify = new Notify();
export default notify;
