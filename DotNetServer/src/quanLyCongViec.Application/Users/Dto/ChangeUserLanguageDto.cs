using System.ComponentModel.DataAnnotations;

namespace quanLyCongViec.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}