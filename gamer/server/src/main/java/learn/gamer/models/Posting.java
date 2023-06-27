package learn.gamer.models;

import java.time.LocalDate;
import java.util.Objects;

public class Posting {
    //fields
    private int postingId;
    private String header;
    private String description;
    private LocalDate datePosted;
    private Game game;

    //constructors
    public Posting() {
    }

    public Posting(int postingId, String header, String description, LocalDate datePosted, Game game) {
        this.postingId = postingId;
        this.header = header;
        this.description = description;
        this.datePosted = datePosted;
        this.game = game;
    }

    //getters and setters

    public int getPostingId() {
        return postingId;
    }

    public void setPostingId(int postingId) {
        this.postingId = postingId;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(LocalDate datePosted) {
        this.datePosted = datePosted;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    //override and hash

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Posting posting = (Posting) o;
        return postingId == posting.postingId &&
                Objects.equals(header, posting.header) &&
                Objects.equals(description, posting.description) &&
                Objects.equals(datePosted, posting.datePosted) &&
                Objects.equals(game, posting.game);
    }

    @Override
    public int hashCode() {
        return Objects.hash(postingId, header, description, datePosted, game);
    }
}//ends class
