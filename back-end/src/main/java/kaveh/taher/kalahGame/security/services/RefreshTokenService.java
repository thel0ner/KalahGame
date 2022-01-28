package kaveh.taher.kalahGame.security.services;

import kaveh.taher.kalahGame.models.RefreshToken;
import kaveh.taher.kalahGame.models.User;
import kaveh.taher.kalahGame.repository.RefreshTokenRepository;
import kaveh.taher.kalahGame.repository.UserRepository;
import kaveh.taher.kalahGame.security.exception.RefreshTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
    @Value("${kaveh.taher.kalahGame.jwtRefreshExpirationMs}")
    private Long refreshTokenDuration;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token){
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(String userId){
        RefreshToken refreshToken = new RefreshToken();
        User user = userRepository.findById(userId).get();
        refreshToken.setUser(user);
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDuration));
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token){
        if(token.getExpiryDate().compareTo(Instant.now()) < 0){
            refreshTokenRepository.delete(token);
            throw new RefreshTokenException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

    @Transactional
    public int deleteByUserId(String userId){
        return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
    }
}
