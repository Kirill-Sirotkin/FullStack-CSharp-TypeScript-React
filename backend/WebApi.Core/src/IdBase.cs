namespace WebApi.Core;

class IdBase
{
    private Guid _id = Guid.NewGuid();
    public Guid Id { get { return _id; } }
}