package kaveh.taher.kalahGame.controllers;

import kaveh.taher.kalahGame.GameEngine.GamePlayer;
import kaveh.taher.kalahGame.GameEngine.InvalidMove;
import kaveh.taher.kalahGame.models.GameResult;
import kaveh.taher.kalahGame.GameEngine.MachinePlayer;
import kaveh.taher.kalahGame.models.Game;
import kaveh.taher.kalahGame.payload.response.GameListResponse;
import kaveh.taher.kalahGame.payload.response.MessageResponse;
import kaveh.taher.kalahGame.payload.response.StartResponse;
import kaveh.taher.kalahGame.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*" , maxAge = 3600)
@RestController
@RequestMapping("/api/games/")
public class GameController {
    @Autowired
    GameRepository gameRepository;

    @GetMapping("/test")
    public ResponseEntity<?> sample(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ResponseEntity.ok(
                new MessageResponse(
                        "hello " + userDetails.getUsername()+ ", System is up!"
                )
        );
    }

    @GetMapping("/list")
    public ResponseEntity<GameListResponse>getAllGames(
            @RequestParam(required = false) String id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        try{
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            List<Game> games = new ArrayList<Game>();
            Pageable paging = PageRequest.of(page,size);
            Page<Game> gamePage;
            if(id != null) {
                gamePage = gameRepository.findByIdAndUsername(id,userDetails.getUsername(),paging);
            }else{
                gamePage = gameRepository.findByUsername(userDetails.getUsername(),paging);
            }
            games = gamePage.getContent();
            return new ResponseEntity<>(
                    new GameListResponse(
                        games, gamePage.getNumber(),gamePage.getTotalElements(),gamePage.getTotalPages()
                    ),HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/start")
    public ResponseEntity<StartResponse>startNewGame(){
       try{
           UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
           int[] playerPits = {4,4,4,4,4,4};
           int[] machinePits = {4,4,4,4,4,4};
           Game game = new Game();
           game.setMachinePits(machinePits);
           game.setPlayerPits(playerPits);
           game.setPlayerStore(0);
           game.setMachineStore(0);
           game.setStartDate(new Date());
           game.setWon(false);
           game.setStatus(false);
           game.setUsername(userDetails.getUsername());
           gameRepository.save(game);
           return new ResponseEntity<>(new StartResponse(
                   game.getId()
           ),HttpStatus.OK);
       }catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    @PutMapping("/move/{id}/{pitId}")
    public ResponseEntity<Map<String,Object>>reactToPlayerMode(
            @PathVariable(required = true) String id,
            @PathVariable(required = true) int pitId
    ){
        try{
            Optional<Game> foundGame = gameRepository.findById(id);
            Game game = foundGame.orElseThrow();
            if(game.getStatus()){
                return new ResponseEntity(new MessageResponse("game is finished!"),HttpStatus.BAD_REQUEST);
            }
            GamePlayer gamePlayer = new GamePlayer(
                    game,
                    pitId
            );
            GameResult userResult = gamePlayer.playersResult();
            if(userResult.getGame().getStatus() == true || userResult.getCanPlayerPlayAgain()){
                gameRepository.save(userResult.getGame());
                return new ResponseEntity(userResult,HttpStatus.OK);
            }
            MachinePlayer machinePlayer = new MachinePlayer(game);
            GameResult machineResult = machinePlayer.playersResult();
            gameRepository.save(machineResult.getGame());
            return new ResponseEntity(machineResult,HttpStatus.OK);
        }catch(InvalidMove invalidMove){
            return new ResponseEntity(
                    new MessageResponse("empty pit selected!"),
                    HttpStatus.BAD_REQUEST
            );
        }catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("remove/{id}")
    ResponseEntity deleteGame(@PathVariable String id){
        try{
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(gameRepository.existsById(id)){
                Game game = gameRepository.findById(id).orElseThrow();
                if(game.getUsername().equals(userDetails.getUsername())){
                    gameRepository.deleteById(id);
                    return new ResponseEntity(HttpStatus.OK);
                }
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }catch(Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
