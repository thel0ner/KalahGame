package kaveh.taher.kalahGame.repository;

import kaveh.taher.kalahGame.models.ERole;
import kaveh.taher.kalahGame.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role,String> {
    Optional<Role> findByName(ERole name);
}
