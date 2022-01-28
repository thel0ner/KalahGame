package kaveh.taher.kalahGame.repository;

import kaveh.taher.kalahGame.models.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface GameRepository extends MongoRepository<Game,String> {
    @Override
    Page<Game> findAll(Pageable pageable);
    Page<Game> findById(String id,Pageable pageable);
    Page<Game> findByIdAndUsername(String id, String username, Pageable pageable);
    Optional<Game> findById(String id);
    Page<Game> findByUsername(String username, Pageable pageable);
    boolean existsById(String id);
    boolean existsByUsername(String username);
}
