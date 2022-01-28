package kaveh.taher.kalahGame.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.Date;


@Document(collection = "games")
public class Game {
    @Id
    private String id;

    @NotBlank
    private String username;

    @NotBlank
    private int[] playerPits;

    @NotBlank
    private int[] machinePits;

    @NotBlank
    @Min(0)
    private int playerStore;

    @NotBlank
    private int machineStore;
    private boolean won;
    private boolean status;

    private Date startDate;
    private Date endDate;

    public Game(){}
    public Game(
            String username,
            int[] playerPits,
            int[] machinePits,
            int playerStore,
            int machineStore,
            boolean won,
            boolean status,
            Date startDate
    ){
        this.username = username;
        this.playerPits = playerPits;
        this.machinePits = machinePits;
        this.won = won;
        this.status = status;
        this.playerStore = playerStore;
        this.machineStore = machineStore;
        this.startDate = startDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int[] getPlayerPits() {
        return playerPits;
    }

    public void setPlayerPits(int[] playerPits) {
        this.playerPits = playerPits;
    }

    public int[] getMachinePits() {
        return machinePits;
    }

    public void setMachinePits(int[] machinePits) {
        this.machinePits = machinePits;
    }

    public int getPlayerStore() {
        return playerStore;
    }

    public void setPlayerStore(int playerStore) {
        this.playerStore = playerStore;
    }

    public int getMachineStore() {
        return machineStore;
    }

    public void setMachineStore(int machineStore) {
        this.machineStore = machineStore;
    }

    public boolean isWon() {
        return won;
    }

    public void setWon(boolean won) {
        this.won = won;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
