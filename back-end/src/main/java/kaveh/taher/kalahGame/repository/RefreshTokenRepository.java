package kaveh.taher.kalahGame.repository;

import kaveh.taher.kalahGame.models.RefreshToken;
import kaveh.taher.kalahGame.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken,String> {
    @Override
    Optional<RefreshToken> findById(String Id);

    Optional<RefreshToken> findByToken(String token);

    int deleteByUser(User user);

}
