using backend.Dtos.Stock;
using backend.Helpers;
using backend.Models;

namespace backend.Interfaces
{
    public interface IStockRepository
    {
         Task<List<Stock>> GetAllAsync(QueryObject query);
         Task<Stock?> GetByIdAsync(int id);
         Task<Stock?> GetBySymbolAsync(string symbol);
         Task<Stock> CreateAsync(Stock stockModel);
         Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto);
         Task<Stock?> DeleteAsync(int id);
         Task<bool> StockExists(int id);
    }
}