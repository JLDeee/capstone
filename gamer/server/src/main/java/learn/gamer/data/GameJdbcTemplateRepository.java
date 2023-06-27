package learn.gamer.data;

import learn.gamer.data.mappers.GameMapper;
import learn.gamer.models.Game;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

public class GameJdbcTemplateRepository implements GameRepository {
    private final JdbcTemplate jdbcTemplate;
    public GameJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Game> findAll() {
        final String sql = "select game_id, game_title "
                + "from game;";
        return jdbcTemplate.query(sql, new GameMapper());
    }

    @Override
    @Transactional
    public Game findByGameTitle(String gameTitle) {
        final String sql = "select game_id, game_title "
                + "from game "
                + "where game_title = ?;";
        return jdbcTemplate.query(sql, new GameMapper(), gameTitle)
                .stream().findFirst().orElse(null);
    }

    @Override
    @Transactional
    public Game add(Game game) {
        final String sql = "insert into game (game_title) values (?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, game.getGameTitle());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0) {
            return null;
        }

        game.setGameId(keyHolder.getKey().intValue());
        return game;
    }

    @Override
    public boolean deleteById(int gameId) {
        final String sql = "delete from game where id = ?;";
        return jdbcTemplate.update(sql, gameId) > 0;
    }
}
