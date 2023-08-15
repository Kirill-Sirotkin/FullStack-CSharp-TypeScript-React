namespace WebApi.Core;

public class QueryOptions
{
    public string SearchWord { get; set; } = string.Empty;
    public string Order { get; set; } = "UdpatedAt";
    public bool OrderByDescending { get; set; } = false;
    public int PageNumber { get; set; } = 1;
    public int PerPage { get; set; } = 10;
}