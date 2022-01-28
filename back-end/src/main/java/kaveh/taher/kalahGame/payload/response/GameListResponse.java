package kaveh.taher.kalahGame.payload.response;

import kaveh.taher.kalahGame.models.Game;

import java.util.List;

public class GameListResponse {
    private List<Game> games;
    private int currentPage;
    private int totalPages;
    private long totalItems;
    public GameListResponse(
            List<Game> game,
            int currentPage,
            long totalItems,
            int totalPages
    ){
        this.games = game;
        this.currentPage = currentPage;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
    }

    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }
}
