namespace WebApi.Service;

public class CustomException : Exception
{
    public int StatusCode { get; set; }
    public string ErrorMessage { get; set; }

    public CustomException(int statusCode = 500, string message = "Internal server error")
    {
        StatusCode = statusCode;
        ErrorMessage = message;
    }

    public static CustomException NotFoundException(string message = "Item cannot be found")
    {
        return new CustomException(404, message);
    }

    public static CustomException DatabaseException(string message = "Error in the database")
    {
        return new CustomException(500, message);
    }

    public static CustomException AuthenticationException(string message = "Unauthorized by the server")
    {
        return new CustomException(401, message);
    }
}