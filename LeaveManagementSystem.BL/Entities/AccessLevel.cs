using G4L.UserManagement.Shared;

namespace G4L.UserManagement.BL.Entities
{
    public enum Access
    {
        New_user, Student, Trainer, Admin
    }
    public class AccessLevel : BaseEntity
    {
        public Access access { get; set; }
    }
}