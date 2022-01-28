package kaveh.taher.kalahGame.controllers;

import kaveh.taher.kalahGame.models.ERole;
import kaveh.taher.kalahGame.models.RefreshToken;
import kaveh.taher.kalahGame.models.Role;
import kaveh.taher.kalahGame.models.User;
import kaveh.taher.kalahGame.payload.request.LoginRequest;
import kaveh.taher.kalahGame.payload.request.RefreshTokenRequest;
import kaveh.taher.kalahGame.payload.request.SignUpRequest;
import kaveh.taher.kalahGame.payload.response.JwtResponse;
import kaveh.taher.kalahGame.payload.response.MessageResponse;
import kaveh.taher.kalahGame.payload.response.RefreshTokenResponse;
import kaveh.taher.kalahGame.repository.RoleRepository;
import kaveh.taher.kalahGame.repository.UserRepository;
import kaveh.taher.kalahGame.security.exception.RefreshTokenException;
import kaveh.taher.kalahGame.security.jwt.JwtUtils;
import kaveh.taher.kalahGame.security.services.RefreshTokenService;
import kaveh.taher.kalahGame.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*" , maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    RefreshTokenService refreshTokenService;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetail = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetail.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetail.getId());

        return ResponseEntity.ok(
                new JwtResponse(
                        jwt,
                        refreshToken.getToken(),
                        userDetail.getId(),
                        userDetail.getUsername(),
                        userDetail.getEmail(),
                        roles
                )
        );
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){
        if(userRepository.existsByUsername(signUpRequest.getUsername())){
            return ResponseEntity
                    .badRequest()
                    .body(
                            new MessageResponse("user name is already in use!")
                    );
        }
        if(userRepository.existsByEmail(signUpRequest.getEmail())){
            return ResponseEntity
                    .badRequest()
                    .body(
                            new MessageResponse("email is already in use!")
                    );
        }
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword())
        );
        Set<String> stringRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();
        if (stringRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            stringRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?>refreshToken(@Valid @RequestBody RefreshTokenRequest request){
        String requestRefreshToken = request.getRefreshToken();
        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user ->{
                    String token = jwtUtils.generateTokenFromUsername(user.getUsername());
                    return ResponseEntity.ok(new RefreshTokenResponse(token,requestRefreshToken));
                }).orElseThrow(
                        () -> new RefreshTokenException(requestRefreshToken,"refresh token not found")
                );
    }
}
