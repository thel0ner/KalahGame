package kaveh.taher.kalahGame.payload.response;

public class StartResponse {
    private String id;
    public StartResponse(String id){
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
