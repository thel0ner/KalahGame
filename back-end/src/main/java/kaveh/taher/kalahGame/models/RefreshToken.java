package kaveh.taher.kalahGame.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.time.Instant;

@Document(collection = "refreshtokens")
public class RefreshToken {
    @Id
    private String Id;

    @NotBlank
    User user;

    @NotBlank
    private String token;

    @NotBlank
    private Instant expiryDate;

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Instant getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Instant expiryDate) {
        this.expiryDate = expiryDate;
    }
}
