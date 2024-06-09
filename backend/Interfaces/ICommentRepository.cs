using backend.Helpers;
using backend.Models;

namespace backend.Interfaces
{
    public interface ICommentRepository
    {
         Task<List<Comment>> GetAllAsync(CommentQueryObject commentQueryObject);
         Task<Comment?> GetByIdAsync(int id);
         Task<Comment> CreateAsync(Comment commentModel);
         Task<Comment?> DeleteAsync(int id);

         Task<Comment?> UpdateAsync(int id, Comment commentModel);

    }
}